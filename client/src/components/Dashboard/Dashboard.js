import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <PowerBIEmbed
      embedConfig={{
        type: "report", // Supported types: report, dashboard, tile, visual and qna
        id: "7f5e5757-0756-456d-9e73-5e8a15ceac08",
        embedUrl:
          "https://app.powerbi.com/reportEmbed?reportId=7f5e5757-0756-456d-9e73-5e8a15ceac08&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLVdFU1QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJhbmd1bGFyT25seVJlcG9ydEVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
        accessToken:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOGM3OGMxMjItZjc4MS00NTAwLTljMmEtZjY0NWE3NjI4MWY1LyIsImlhdCI6MTY0NzUwNDIzOSwibmJmIjoxNjQ3NTA0MjM5LCJleHAiOjE2NDc1MDkxNjIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUEwUW1vT0E4a1JMdjFHYysyTzNUQzNPTkVsMzFkUkRITlJKRzZBc2RVb0xmSElLZVkwQk92SWIzQ1hKVy90cGdGIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiU2hpcnB1cmthciIsImdpdmVuX25hbWUiOiJVandhbCIsImlwYWRkciI6IjExNy4xOTYuMTI2Ljg3IiwibmFtZSI6IlVqd2FsIFNoaXJwdXJrYXIiLCJvaWQiOiJhMmRiNDcwYy0xNDZiLTQwYmMtYWNjZS0wYmUzYjcwZjBkNmEiLCJwdWlkIjoiMTAwMzIwMDE0NEFDMUZFNiIsInJoIjoiMC5BVDBBSXNGNGpJSDNBRVdjS3ZaRnAyS0I5UWtBQUFBQUFBQUF3QUFBQUFBQUFBQTlBUDQuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoibXh6OVNJSUtTSWpnVGE2QzlNTHc4RVFnclFmei0tQl9Xby0xOUlWZ3RucyIsInRpZCI6IjhjNzhjMTIyLWY3ODEtNDUwMC05YzJhLWY2NDVhNzYyODFmNSIsInVuaXF1ZV9uYW1lIjoidWp3YWwuMjE4MTAzODBAdmlpdC5hYy5pbiIsInVwbiI6InVqd2FsLjIxODEwMzgwQHZpaXQuYWMuaW4iLCJ1dGkiOiJtcHU3UEZDS3dVS0dwSkp6S1ZndUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.GB45zqP0O4V8oc-nZ8ix5GXF1juaI2VA10LiFDC2pTSRNyiYbph-qb9YCb228HurG_KTavCLvKXCTS9ODLW6mrpHTp_kiweK6Drof5OnyNCSozIW8HCiEUtUeoORVvBuCVO0ohKE_6A7Mjzo7lKrhEELmrDnJBQrEGC8G2pqsPnduQeHrg8Sc_9Rf26iZIf5Mi8l2aIYQYFZ1GXZOWPWXlFrRNn3ddGFJUv3AvoD61u6AfujPHWRwxENsvjhaGEMs1tB-S2ojRovwqEyXZ672kAYIAfgPdpCT6wJ_w8sXGPw-b-FLThRTSEgPZ082Tf7X9f5MWrSTf_8EDCmOkESww",
        tokenType: models.TokenType.Aad,
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false,
            },
          },
        },
      }}
      eventHandlers={
        new Map([
          [
            "loaded",
            function () {
              console.log("Report loaded");
            },
          ],
          [
            "rendered",
            function () {
              console.log("Report rendered");
            },
          ],
          [
            "error",
            function (event) {
              console.log(event.detail);
            },
          ],
        ])
      }
      cssClassName={"embed-container"}
      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
    />
  );
}
