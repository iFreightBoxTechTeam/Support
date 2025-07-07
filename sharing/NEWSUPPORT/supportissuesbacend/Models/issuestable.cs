using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class issuestable
    {

        // Matable fields
        public Guid issues_id { get; set; }
   
    public string Description { get; set; }
        public List<string> ImagePaths { get; set; }
        public string Name { get; set; }
        public string TenantCode { get; set; }
        public int UserId { get; set; }
        public string StatusName { get; set; }  // For the PUT request to change status name

        public string Module { get; set; }
        // StatusLog fields
        public string IssueType { get; set; }
        public int Issues_Number { get; set; }
        public string AssignTo { get; set; }
        public DateTime? ResolveDate { get; set; }
        public DateTime Raised_date { get; set; }
        public  decimal? TakenTime { get; set; }
        public List<LogEntry> Logs { get; set; } // New parsed logs

    }
    public class LogEntry
    {
        public int LogNumber { get; set; }  // Capital L here
   
        public string LogStatusName { get; set; }
        public DateTime RaisedDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
    }




}
