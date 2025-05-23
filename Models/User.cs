using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class User
    {
         
        public int Id { get; set; }         // Primary Key
        public string Name { get; set; }    // User's Name
        public string Email { get; set; }   // User's Email
    
}
}