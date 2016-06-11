using System.Collections.Generic;

namespace Opid.Utilities
{
	public static class IDictionaryExtensions
	{
		public static TValue GetValueOrDefault<TKey,TValue>(this IDictionary<TKey,TValue> dictionary, TKey key)
		{
			return dictionary != null && dictionary.ContainsKey(key) ? dictionary[key] : default(TValue);
		}
	}
}