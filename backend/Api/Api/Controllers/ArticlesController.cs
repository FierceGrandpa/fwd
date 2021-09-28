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

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ArticlesController(AppDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleModel>>> FetchAll()
        {
            return await _context.Articles
                .Select(x => new ArticleModel()
                {
                    Id = x.Id,
                    Date = x.Date,
                    Title = x.Title,
                    Promo = x.Promo,
                    Content = x.Content,
                    ImageName = x.ImageName,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/Articles/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleModel>> GetById(int id)
        {
            var record = await _context.Articles.FindAsync(id);
            if (record == null)
                return NotFound();

            return record;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ArticleModel record)
        {
            if (!Request.Headers.TryGetValue("Authorization", out var value) || value != "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGSIFde8QOv3l4sGJ+GKjdQiJjVZxz84ZBPIR4BKVKEQQeNJ7HG0KnUn9sbDKz9ZjWYURgSp9VzXRjqJ91yliXJlljKI58q0kJ0iHS0W64u495xbrZJsL2To3miZQZe7s79akKmBk37HJp25rOhixRVDfluuWT7A81O85ajrNcYxAgMBAAE=") {
                return BadRequest();
            }

            if (id != record.Id)
                return BadRequest();

            if (record.ImageFile != null)
            {
                DeleteImage(record.ImageName);
                record.ImageName = await SaveImage(record.ImageFile);
            }

            _context.Entry(record).State = EntityState.Modified;

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

        [HttpPost]
        public async Task<ActionResult<ArticleModel>> Post([FromForm] ArticleModel record)
        {
            if (!Request.Headers.TryGetValue("Authorization", out var value) || value != "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGSIFde8QOv3l4sGJ+GKjdQiJjVZxz84ZBPIR4BKVKEQQeNJ7HG0KnUn9sbDKz9ZjWYURgSp9VzXRjqJ91yliXJlljKI58q0kJ0iHS0W64u495xbrZJsL2To3miZQZe7s79akKmBk37HJp25rOhixRVDfluuWT7A81O85ajrNcYxAgMBAAE=")
            {
                return BadRequest();
            }
            var fileName = await SaveImage(record.ImageFile);
            if (fileName == null)
                return StatusCode((int)HttpStatusCode.BadRequest);

            record.ImageName = fileName;

            _context.Articles.Add(record);
            await _context.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ArticleModel>> Delete(int id)
        {
            if (!Request.Headers.TryGetValue("Authorization", out var value) || value != "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGSIFde8QOv3l4sGJ+GKjdQiJjVZxz84ZBPIR4BKVKEQQeNJ7HG0KnUn9sbDKz9ZjWYURgSp9VzXRjqJ91yliXJlljKI58q0kJ0iHS0W64u495xbrZJsL2To3miZQZe7s79akKmBk37HJp25rOhixRVDfluuWT7A81O85ajrNcYxAgMBAAE=")
            {
                return BadRequest();
            }

            var record = await _context.Articles.FindAsync(id);
            if (record == null)
                return NotFound();

            DeleteImage(record.ImageName);

            _context.Articles.Remove(record);
            await _context.SaveChangesAsync();

            return record;
        }

        private bool RecordExists(int id) => _context.Articles.Any(e => e.Id == id);

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            if (imageFile == null)
                return null;

            var filename = Path.GetFileNameWithoutExtension(imageFile.FileName);
            filename = new string(filename.Take(10).ToArray()).Replace(' ', '-');

            var time = DateTime.Now.ToString("yymmssfff");
            var ext = Path.GetExtension(imageFile.FileName);

            var name = $"{filename}_{time}{ext}";
            var path = Path.Combine(_hostEnvironment.ContentRootPath, "Images/Articles", name);

            using (var fs = new FileStream(path, FileMode.Create))
            {
                await imageFile.CopyToAsync(fs);
            }

            return name;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images/Articles", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
