$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$token = 'vcp_6WFuOiJvNV5kswxbMqKitGkbb3zqPu1iAQuwZIyPqsv8B89ZL70gmZQK'
Write-Host "Token: $($token.Substring(0,15))..."
try {
    $r = Invoke-WebRequest -Uri 'https://api.vercel.com/v13/user' -Headers @{'Authorization'="Bearer $token"} -TimeoutSec 10 -ErrorAction Stop
    Write-Host "TOKEN_OK: $($r.StatusCode)"
} catch {
    Write-Host "TOKEN_FAIL: $($_.Exception.Response.StatusCode.value__)"
}
