using System.ComponentModel.DataAnnotations;

namespace Api.Model
{
    public abstract class Entity
    {
        [Key]
        public int Id { get; set; }
    }
}
