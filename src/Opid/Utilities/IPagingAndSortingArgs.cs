using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Opid.Utilities
{
	public interface IPagingAndSortingArgs
	{
		int pageSize { get; }
		int pageNumber { get; }
		string orderBy { get; }
		bool orderDesc { get; }
	}

	public interface IFilterAndSortExpressions<TEntity, TArgs>
	{
		FilterPredicate<TEntity, TArgs>[] FilterPredicates { get; }
		IDictionary<string, Expression<Func<TEntity, string>>> OrderByStringKeySelectors { get; }
		IDictionary<string, Expression<Func<TEntity, DateTimeOffset?>>> OrderByDateKeySelectors { get; }
		IDictionary<string, Expression<Func<TEntity, int?>>> OrderByIntKeySelectors { get; }
	}

	public abstract class FilterAndSortExpressions<TEntity, TArgs> : IFilterAndSortExpressions<TEntity, TArgs>
	{
		private static readonly FilterPredicate<TEntity, TArgs>[] NO_FILTER_PREDICATES = new FilterPredicate<TEntity, TArgs>[0];
		public virtual FilterPredicate<TEntity, TArgs>[] FilterPredicates => NO_FILTER_PREDICATES;
		public virtual IDictionary<string, Expression<Func<TEntity, string>>> OrderByStringKeySelectors => null;
		public virtual IDictionary<string, Expression<Func<TEntity, DateTimeOffset?>>> OrderByDateKeySelectors => null;
		public virtual IDictionary<string, Expression<Func<TEntity, int?>>> OrderByIntKeySelectors => null;
	}

	public class FilterPredicate<TEntity, TArgs>
	{
		public readonly Func<TArgs, bool> IsApplicable;
		public readonly Expression<Func<TEntity, TArgs, bool>> Predicate;

		public FilterPredicate(
			Func<TArgs, bool> isApplicable,
			Expression<Func<TEntity, TArgs, bool>> predicate)
		{
			IsApplicable = isApplicable;
			Predicate = predicate;
		}
	}

	public static class IPagingAndSortingArgsExtensions
	{
		/// <summary>
		/// Applies filtering and sorting expressions to an entity set, and then returns a page of results.
		/// </summary>
		/// <typeparam name="TEntity"></typeparam>
		/// <typeparam name="TArgs"></typeparam>
		/// <param name="args"></param>
		/// <param name="entities"></param>
		/// <param name="totalItemCount">The count of entities that matched all applicable filter expressions.</param>
		/// <returns></returns>
		public static IQueryable<TEntity> Apply<TEntity, TArgs>(
			this TArgs args,
			IQueryable<TEntity> entities,
			out int totalItemCount)
			where TArgs : IPagingAndSortingArgs, IFilterAndSortExpressions<TEntity, TArgs>
		{
			foreach (var filterPredicate in args.FilterPredicates.Where(fp => fp.IsApplicable(args)))
			{
				entities = entities
					.AsExpandable()
					.Where(e => filterPredicate.Predicate.Invoke(e, args));
			}
			totalItemCount = entities.Count();

			return args.OrderEntities(entities)
				.Skip(args.pageSize * Math.Max(args.pageNumber - 1, 0))
				.Take(args.pageSize);
		}

		private static IOrderedQueryable<TEntity> OrderEntities<TEntity, TArgs>(
			this TArgs args,
			IQueryable<TEntity> entities)
			where TArgs : IPagingAndSortingArgs, IFilterAndSortExpressions<TEntity, TArgs>
		{
			var orderByKey = (args.orderBy ?? string.Empty).ToLower();

			var orderByStringKeySelector = args.OrderByStringKeySelectors.GetValueOrDefault(orderByKey);
			if (orderByStringKeySelector != null)
			{
				return args.orderDesc
					? entities.OrderByDescending(orderByStringKeySelector)
					: entities.OrderBy(orderByStringKeySelector);
			}

			var orderByDateKeySelector = args.OrderByDateKeySelectors.GetValueOrDefault(orderByKey);
			if(orderByDateKeySelector != null)
			{
				return args.orderDesc
					? entities.OrderByDescending(orderByDateKeySelector)
					: entities.OrderBy(orderByDateKeySelector);
			}

			var orderByIntKeySelector = args.OrderByIntKeySelectors.GetValueOrDefault(orderByKey);
			if (orderByIntKeySelector != null)
			{
				return args.orderDesc
					? entities.OrderByDescending(orderByIntKeySelector)
					: entities.OrderBy(orderByIntKeySelector);
			}

			return entities.OrderBy(e => true);
		}
	}
}