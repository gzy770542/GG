$H = New-Object Net.HttpListener
$H.Prefixes.Add("http://localhost:8080/")
$H.Start()
Write-Host "Server started at http://localhost:8080/"
Write-Host "Press Ctrl+C to stop."

try {
    While ($H.IsListening) {
        $C = $H.GetContext()
        $R = $C.Response
        $F = $C.Request.Url.LocalPath
        
        # Default to index.html
        If ($F -eq "/") { $F = "/index.html" }
        
        # Remove leading slash and combine with current directory
        $RelativePath = $F.Substring(1)
        $P = Join-Path (Get-Location) $RelativePath
        
        Write-Host "Request: $F -> $P"

        If (Test-Path $P -PathType Leaf) {
            $B = [IO.File]::ReadAllBytes($P)
            
            # Simple MIME type detection
            $Ext = [IO.Path]::GetExtension($P).ToLower()
            Switch ($Ext) {
                ".html" { $R.ContentType = "text/html" }
                ".css"  { $R.ContentType = "text/css" }
                ".js"   { $R.ContentType = "application/javascript" }
                ".json" { $R.ContentType = "application/json" }
                ".png"  { $R.ContentType = "image/png" }
                ".jpg"  { $R.ContentType = "image/jpeg" }
                ".jpeg" { $R.ContentType = "image/jpeg" }
                ".gif"  { $R.ContentType = "image/gif" }
                ".svg"  { $R.ContentType = "image/svg+xml" }
                ".mp4"  { $R.ContentType = "video/mp4" }
            }

            $R.ContentLength64 = $B.Length
            $R.OutputStream.Write($B, 0, $B.Length)
            $R.StatusCode = 200
        } Else {
            $R.StatusCode = 404
            Write-Host "404 Not Found: $P"
        }
        $R.Close()
    }
} catch {
    Write-Host "Server stopped."
} finally {
    $H.Stop()
}
