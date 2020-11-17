using API.Dtos;
using AutoMapper;
using Core.Entities;

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
        }
    }
}