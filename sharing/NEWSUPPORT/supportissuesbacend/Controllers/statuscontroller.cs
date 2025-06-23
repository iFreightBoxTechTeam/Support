using supportissuesbacend.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;

public class statuscontroller:ApiController
{
    private readonly string connStr = ConfigurationManager.ConnectionStrings["webapi"].ConnectionString;

    // Insert
    [HttpPost]
    [Route("api/status")]
    public IHttpActionResult InsertStatus([FromBody] Status status)
    {
        if (status == null || string.IsNullOrEmpty(status.StatusName))
            return BadRequest("Invalid status data.");

        using (SqlConnection con = new SqlConnection(connStr))
        using (SqlCommand cmd = new SqlCommand("sp_InsertStatus", con))
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@statusname", status.StatusName);
            con.Open();
            cmd.ExecuteNonQuery();
        }
        return Ok();
    }
    // Get All
    [HttpGet]
    [Route("api/status")]
    public List<Status> GetAllStatuses()
    {
        List<Status> statuses = new List<Status>();
        using (SqlConnection con = new SqlConnection(connStr))
        using (SqlCommand cmd = new SqlCommand("sp_GetAllStatuses", con))
        {
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                statuses.Add(new Status
                {
                    StatusId = (Guid)reader["statusid"],
                    StatusName = reader["statusname"].ToString()
                });
            }
        }
        return statuses;
    }
    [HttpGet]
    [Route("api/status/{statusid}")]
    public Status GetStatusById(Guid statusId)
    {
        Status status = null;
        using (SqlConnection con = new SqlConnection(connStr))
        using (SqlCommand cmd = new SqlCommand("sp_GetStatusById", con))
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@statusid", statusId);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                status = new Status
                {
                    StatusId = (Guid)reader["statusid"],
                    StatusName = reader["statusname"].ToString()
                };
            }
        }
        return status;
    }

    [HttpPut]
    [Route("api/status/{statusid}")]
    public IHttpActionResult UpdateStatus(Guid statusid, [FromBody] Status status)
    {
        if (status == null || string.IsNullOrEmpty(status.StatusName))
            return BadRequest("Invalid status data.");

        using (SqlConnection con = new SqlConnection(connStr))
        using (SqlCommand cmd = new SqlCommand("sp_UpdateStatus", con))
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@statusid", statusid);
            cmd.Parameters.AddWithValue("@statusname", status.StatusName);
            con.Open();
            cmd.ExecuteNonQuery();
        }
        return Ok();
    }
    [HttpDelete]
    [Route("api/status/{statusid}")]
    public IHttpActionResult DeleteStatus(Guid statusid)
    {
        using (SqlConnection con = new SqlConnection(connStr))
        using (SqlCommand cmd = new SqlCommand("sp_DeleteStatus", con))
        {
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@statusId", statusid);
            con.Open();

            int rowsAffected = cmd.ExecuteNonQuery();

            if (rowsAffected == 0)
                return NotFound();

            return Ok("Deleted");
        }
    }

}
