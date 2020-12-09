using System;
using System.Collections.Generic;
using Core.Entities.OrderAggregate;

namespace API.Dtos
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public string BayerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public Address ShipAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public decimal ShippingPrice { get; set; }
        public decimal Total { get; set; }

        public string Status { get; set; }
        
    }
}