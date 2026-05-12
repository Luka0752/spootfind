$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$token = 'vcp_6WFuOiJvNV5kswxbMqKitGkbb3zqPu1iAQuwZIyPqsv8B89ZL70gmZQK'
try {
    $r = Invoke-WebRequest -Uri 'https://api.vercel.com/v13/user' -Headers @{'Authorization'="Bearer $token"} -TimeoutSec 10 -ErrorAction Stop
    Write-Host "OK: $($r.StatusCode)"
    Write-Host $r.Content
} catch {
    $code = 0
    try { $code = $_.Exception.Response.StatusCode.value__ } catch {}
    Write-Host "FAIL: $code"
    try {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $body = $reader.ReadToEnd()
        Write-Host $body
    } catch {}
}
