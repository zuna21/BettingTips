using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TipCreateDto, Tip>();
            CreateMap<Tip, TipDto>();
            CreateMap<PackageCreateDto, Package>();
            CreateMap<Package, PackageDto>();
            CreateMap<PackageDto, Package>();
            CreateMap<PhotoDto, Photo>();
            CreateMap<PhotoCreateDto, Photo>();
            CreateMap<Photo, PhotoDto>();
        }
    }
}