using System;
using System.Collections.Generic;
using System.Linq;

namespace Core.Entities.OrderAggregate
{
    public class Order: BaseEntity
    {
        public Order()
        {
        }

        public Order(IReadOnlyList<OrderItem> orderItems, string bayerEmail, Address shipAddress, DeliveryMethod deliveryMethod, string paymentIntentId)
        {
            BayerEmail = bayerEmail;
            ShipAddress = shipAddress;
            DeliveryMethod = deliveryMethod;
            PaymentIntentId = paymentIntentId;
            OrderItems = orderItems;
            // se podría calcular el subtotal aquí
            var st = orderItems.Sum(o => o.Price * o.Quantity);
            // Subtotal = subtotal;
            Subtotal = st;
        }

        public string BayerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }=DateTimeOffset.Now;
        public Address ShipAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }
        public decimal GetTotal(){
            return Subtotal + DeliveryMethod.Price;
        }
    }
}