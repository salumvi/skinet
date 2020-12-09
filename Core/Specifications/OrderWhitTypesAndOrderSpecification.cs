using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderWhitTypesAndOrderSpecification : BaseSpecification<Order>
    {
        // filtramos por email
        public OrderWhitTypesAndOrderSpecification(string email) : base(o => o.BayerEmail == email)
        {
            AddInclude(o => o.DeliveryMethod);
            AddInclude(o => o.OrderItems);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrderWhitTypesAndOrderSpecification(int id, string email) : base(o => o.Id == id && o.BayerEmail == email)
        {
            AddInclude(o => o.DeliveryMethod);
            AddInclude(o => o.OrderItems);
        }
    }
}