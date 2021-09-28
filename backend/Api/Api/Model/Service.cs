using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Model
{
    public class ServiceModel : Entity
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public ICollection<OfferModel> Offers { get; set; }

        public int Width { get; set; }
        public int Height { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Alt { get; set; }

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
