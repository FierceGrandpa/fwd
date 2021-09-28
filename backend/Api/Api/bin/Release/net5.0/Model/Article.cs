using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Model
{
    public class ArticleModel : Entity
    {
        public DateTime Date { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Promo { get; set; }
        public string Content { get; set; }

        #region Image
        [Column(TypeName = "nvarchar(100)")]
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        #endregion
    }
}
