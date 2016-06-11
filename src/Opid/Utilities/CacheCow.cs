using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Concurrent;

namespace Opid.Utilities
{
	public class CacheCow
	{
		private readonly IMemoryCache Cache;
		private static readonly ConcurrentDictionary<string, object> LOCKS = new ConcurrentDictionary<string, object>();

		public CacheCow(IMemoryCache cache)
		{
			Cache = cache;
		}

		public T GetViaCache<T>(string key, Func<T> getFromElsewhere)
			where T : class
		{
			lock (LOCKS.GetOrAdd(key, GetNewLock))
			{
				return Cache.Get<T>(key) ?? Cache.Set(key, getFromElsewhere());
			}
		}

		public void InvalidateCache(string key)
		{
			lock (LOCKS.GetOrAdd(key, GetNewLock))
			{
				Cache.Remove(key);
			}
		}

		private object GetNewLock(string key)
		{
			return new object();
		}
	}
}
