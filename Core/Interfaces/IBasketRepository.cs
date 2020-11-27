using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
         Task<CustomerBasket> GetBasketAsynyc(string basketId);
         Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);
         Task<bool> DeleteBasketAsync( string basketId);
    }
}