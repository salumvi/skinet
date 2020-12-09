using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(p => p.ProducBrand, o => o.MapFrom(x => x.ProducBrand.Name))
                .ForMember(p => p.ProductType, o => o.MapFrom(x => x.ProductType.Name))
                .ForMember(p =>p.PictureUrl, o => o.MapFrom<ProductUrlResolver>());
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto,BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Core.Entities.OrderAggregate.Order, OrderToReturnDto>()
              .ForMember(o => o.DeliveryMethod, o => o.MapFrom(x => x.DeliveryMethod.ShortName))
              .ForMember(o => o.ShippingPrice, o => o.MapFrom(x => x.DeliveryMethod.Price));

            CreateMap<Core.Entities.OrderAggregate.OrderItem, OrderItemDto>()
                .ForMember(o => o.ProductId, o => o.MapFrom(x => x.ItemOrdered.ProductItemId))
                .ForMember(o => o.ProductName, o => o.MapFrom(x => x.ItemOrdered.ProductName))
                .ForMember(o => o.PictureUrl, o => o.MapFrom(x => x. ItemOrdered.PictureUrl))
                .ForMember(o => o.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}