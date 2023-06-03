using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IPhotoRepository _photoRepository;
        private readonly IMapper _mapper;
        public FileController(
            IPhotoRepository photoRepository,
            IMapper mapper
        )
        {
            _photoRepository = photoRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<PhotoDto>> UploadImage()
        {
            try
            {
                var file = Request.Form.Files[0]; // Assuming only one file is being uploaded

                if (file.Length > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);
                    var photoCreate = new PhotoCreateDto
                    {
                        Name = fileName,
                        Path = filePath
                    };

                    var photo = _mapper.Map<Photo>(photoCreate);
                    _photoRepository.AddNewPhoto(photo);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    if (await _photoRepository.SaveAllAsync()) return _mapper.Map<PhotoDto>(photo);
                    return BadRequest("Failed to create photo.");
                }

                return BadRequest("No file was uploaded.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}