import React from "react";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from "powerbi-client";
import "./Dashboard.css"

export default function Dashboard() {

  return (
    <PowerBIEmbed
      embedConfig={{
        type: 'report',   // Supported types: report, dashboard, tile, visual and qna
        id: '7f5e5757-0756-456d-9e73-5e8a15ceac08',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=7f5e5757-0756-456d-9e73-5e8a15ceac08&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLVdFU1QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJhbmd1bGFyT25seVJlcG9ydEVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOGM3OGMxMjItZjc4MS00NTAwLTljMmEtZjY0NWE3NjI4MWY1LyIsImlhdCI6MTY0MDg4MzI0NywibmJmIjoxNjQwODgzMjQ3LCJleHAiOjE2NDA4ODczMDMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUEyL1E2QmRDNzZkZW9pdlFzb0JpVmlNdkZFeEl6NzdNdXVDd24zK2I3Rkc0clU2bjVOaU9IY3cvUWRkV2ZQeHdiIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiU2hpcnB1cmthciIsImdpdmVuX25hbWUiOiJVandhbCIsImlwYWRkciI6IjExNy4xOTYuMTI0LjI1NCIsIm5hbWUiOiJVandhbCBTaGlycHVya2FyIiwib2lkIjoiYTJkYjQ3MGMtMTQ2Yi00MGJjLWFjY2UtMGJlM2I3MGYwZDZhIiwicHVpZCI6IjEwMDMyMDAxNDRBQzFGRTYiLCJyaCI6IjAuQVQwQUlzRjRqSUgzQUVXY0t2WkZwMktCOVE4QkhJZGhYckZQZzZ5WVlRcC1rUkE5QVA0LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6Im14ejlTSUlLU0lqZ1RhNkM5TUx3OEVRZ3JRZnotLUJfV28tMTlJVmd0bnMiLCJ0aWQiOiI4Yzc4YzEyMi1mNzgxLTQ1MDAtOWMyYS1mNjQ1YTc2MjgxZjUiLCJ1bmlxdWVfbmFtZSI6InVqd2FsLjIxODEwMzgwQHZpaXQuYWMuaW4iLCJ1cG4iOiJ1andhbC4yMTgxMDM4MEB2aWl0LmFjLmluIiwidXRpIjoid2pydjlhUFlqMFNyUmx2OU1ONWJBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.G-amxZtYz1RWDWg3bl8SFDLg_VotcPly8PSGf8J_p6WXcpwgtcrd6hElY9ckrUrr2B108uRRYNvU7YNA2VGOKotNPmJuJlXZYzLTzzteVPoFt8Hae_5fCK8ax-rHl9JcgPHqVJHJ1OSzqtEYc4b2xsbaY-135nPn65fA74O9Ul2aH_C_Eqqnl33ABDrDMlrsT55AmHaUqVsAx19K8twqSwQlfS0Z2m0Rg-S0GS3OG9fGwbfBnHDRyCF-_MCwFv63oWH2_xEb-ao6rId-N7RWJ5hkLeARZUrqRrc5mocDwW2VI_B_NEPue37xxhZzsb5gbfQvY8CVFVU3cu81tEUwow',
        tokenType: models.TokenType.Aad,
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false
            }
          },
        }
      }}

      eventHandlers={
        new Map([
          ['loaded', function () { console.log('Report loaded'); }],
          ['rendered', function () { console.log('Report rendered'); }],
          ['error', function (event) { console.log(event.detail); }]
        ])
      }

      cssClassName={"embed-container"}

      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
    />
  );
}