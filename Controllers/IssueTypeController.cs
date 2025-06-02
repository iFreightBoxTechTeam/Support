using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;

using WebApplication2.Models;
using System.Configuration;

namespace userproblem.Controllers
{
    public class IssueTypeController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString);

        [HttpGet]
        [Route("api/issuetype")]
        // GET api/issuetype
        public IEnumerable<IssueType> Get()
        {
            var issueTypes = new List<IssueType>();

            using (var cmd = new SqlCommand("sp_GetIssueTypes", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        issueTypes.Add(new IssueType
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Issue_Type = reader.GetString(reader.GetOrdinal("issue_type"))
                        });
                    }
                }
            }

            return issueTypes;
        }
        [HttpGet]
        [Route("api/issuetype/{id}")]
        // GET api/issuetype/5
        public IssueType Get(int id)
        {
            IssueType issueType = null;

            using (var cmd = new SqlCommand("sp_GetIssueTypeById", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        issueType = new IssueType
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Issue_Type = reader.GetString(reader.GetOrdinal("issue_type"))
                        };
                    }
                }
            }

            return issueType;
        }
        [HttpPost]
        [Route("api/issuetype")]
        // POST api/issuetype
        public IHttpActionResult Post([FromBody] IssueType issue)
        {
            if (issue == null || string.IsNullOrWhiteSpace(issue.Issue_Type))
                return BadRequest("Issue type is required.");

            using (var cmd = new SqlCommand("sp_InsertIssueType", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@issue_type", issue.Issue_Type);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Issue type inserted successfully.");
        }

        // PUT api/issuetype/5
        [HttpPut]
        [Route("api/issuetype/{id}")]
        public IHttpActionResult Put(int id, [FromBody] IssueType issue)
        {
            if (issue == null || string.IsNullOrWhiteSpace(issue.Issue_Type))
                return BadRequest("Issue type is required.");

            using (var cmd = new SqlCommand("sp_UpdateIssueType", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@issue_type", issue.Issue_Type);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Issue type updated successfully.");
        }
        [HttpDelete]
        [Route("api/issuetype/{id}")]

        // DELETE api/issuetype/5
        public IHttpActionResult Delete(int id)
        {
            using (var cmd = new SqlCommand("sp_DeleteIssueType", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Issue type deleted successfully.");
        }
    }
}
