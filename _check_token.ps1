$env:VERCEL_TOKEN = 'vcp_6WFuOiJvNV5kswxbMqKitGkbb3zqPu1iAQuwZIyPqsv8B89ZL70gmZQK'
$resp = Invoke-WebRequest -Uri 'https://api.vercel.com/v13/user' -Headers @{Authorization="Bearer $($env:VERCEL_TOKEN)"} -TimeoutSec 8 -ErrorAction SilentlyContinue
if ($resp) { Write-Host "TOKEN_OK:" $resp.StatusCode } else { Write-Host "TOKEN_FAIL" }