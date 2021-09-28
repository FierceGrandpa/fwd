using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Api.Model;
using System.Net;
using Newtonsoft.Json;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ServicesController(AppDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> FetchAll()
        {
            return await _context.Services
                .Select(x => new ServiceModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Offers = x.Offers,
                    Width = x.Width,
                    Height = x.Height,
                    Alt = x.Alt,
                    ImageName = x.ImageName,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/Services/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceModel>> GetById(int id)
        {
            var record = await _context.Services.FindAsync(id);
            if (record == null)
                return NotFound();

            return record;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ServiceDto response)
        {
            if (!Request.Headers.TryGetValue("Authorization", out var value) || value != "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGSIFde8QOv3l4sGJ+GKjdQiJjVZxz84ZBPIR4BKVKEQQeNJ7HG0KnUn9sbDKz9ZjWYURgSp9VzXRjqJ91yliXJlljKI58q0kJ0iHS0W64u495xbrZJsL2To3miZQZe7s79akKmBk37HJp25rOhixRVDfluuWT7A81O85ajrNcYxAgMBAAE=")
            {
                return BadRequest();
            }
            var record = await _context.Services.FindAsync(id);
            if (record == null)
                return NotFound();
            if (record.Id != response.Id)
                return BadRequest();

            if (response.ImageFile != null)
            {
                DeleteImage(record.ImageName);
                record.ImageName = await SaveImage(response.ImageFile);
            }

            record.Offers = null;
            _context.Services.Update(record);
            _context.Offers.RemoveRange(_context.Offers.Where(e => e.ServiceId == id));
            _context.SaveChanges();

            var offersDto = JsonConvert.DeserializeObject<OfferDto[]>(response.Offers);
            var offers = offersDto.Select(e => new OfferModel()
            {
                Name = e.Name,
                Price = e.Price,
                ServiceId = id,
            });

            await _context.Offers.AddRangeAsync(offers);
            await _context.SaveChangesAsync();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordExists(id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        public record ServiceDto(
            int Id,
            string Title,
            string Description,
            string Offers,
            int Width,
            int Height,
            string Alt,
            IFormFile ImageFile
        );
        public record OfferDto(int Id, string Name, int Price);

        [HttpPost]
        public async Task<ActionResult<ServiceModel>> Post([FromForm] ServiceDto response)
        {
            if (!Request.Headers.TryGetValue("Authorization", out var value) || value != "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGSIFde8QOv3l4sGJ+GKjdQiJjVZxz84ZBPIR4BKVKEQQeNJ7HG0KnUn9sbDKz9ZjWYURgSp9VzXRjqJ91yliXJlljKI58q0kJ0iHS0W64u495xbrZJsL2To3miZQZe7s79akKmBk37HJp25rOhixRVDfluuWT7A81O85ajrNcYxAgMBAAE=")
            {
                return BadRequest();
            }
            var fileName = await SaveImage(response.ImageFile);
            if (fileName == null)
                return StatusCode((int)HttpStatusCode.BadRequest);

            var record = new ServiceModel
            {
                Title = response.Title,
                Description = response.Description,
                Width = response.Width,
                Height = response.Height,
                Alt = response.Alt,
                ImageName = fileName,
            };
            _context.Services.Add(record);
            _context.SaveChanges();

            var offersDto = JsonConvert.DeserializeObject<OfferDto[]>(response.Offers);

            var offers = offersDto.Select(e => new OfferModel() { 
                Name = e.Name, 
                Price = e.Price,
                ServiceId = record.Id,
            });

            await _context.Offers.AddRangeAsync(offers);
            await _context.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceModel>> Delete(int id)
        {
            if (!Request.Headers.TryGetValue("Authorization", out var value) || value != "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGSIFde8QOv3l4sGJ+GKjdQiJjVZxz84ZBPIR4BKVKEQQeNJ7HG0KnUn9sbDKz9ZjWYURgSp9VzXRjqJ91yliXJlljKI58q0kJ0iHS0W64u495xbrZJsL2To3miZQZe7s79akKmBk37HJp25rOhixRVDfluuWT7A81O85ajrNcYxAgMBAAE=")
            {
                return BadRequest();
            }
            var record = await _context.Services.FindAsync(id);
            if (record == null)
                return NotFound();

            DeleteImage(record.ImageName);

            _context.Services.Remove(record);
            await _context.SaveChangesAsync();

            return record;
        }

        private bool RecordExists(int id) => _context.Services.Any(e => e.Id == id);

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            var filename = Path.GetFileNameWithoutExtension(imageFile.FileName);
            filename = new string(filename.Take(10).ToArray()).Replace(' ', '-');

            var time = DateTime.Now.ToString("yymmssfff");
            var ext = Path.GetExtension(imageFile.FileName);

            var name = $"{filename}_{time}{ext}";
            var path = Path.Combine(_hostEnvironment.ContentRootPath, "Images/Services", name);
            
            using (var fs = new FileStream(path, FileMode.Create))
            {
                await imageFile.CopyToAsync(fs);
            }
            
            return name;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images/Services", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
