Add-Type -AssemblyName System.Drawing
$imgPath = 'C:\Users\ELCOT\Desktop\TCT-main\TCT-main\public\images\Logo.jpeg'
$img = [System.Drawing.Image]::FromFile($imgPath)
$bmp = New-Object System.Drawing.Bitmap($img)

$blueColors = @{}
$orangeColors = @{}

for ($x = 0; $x -lt $bmp.Width; $x += 5) {
    for ($y = 0; $y -lt $bmp.Height; $y += 5) {
        $color = $bmp.GetPixel($x, $y)
        $r = $color.R
        $g = $color.G
        $b = $color.B
        $hex = '#{0:X2}{1:X2}{2:X2}' -f $r, $g, $b
        
        # Blue detection
        if ($b -gt ($r + 30) -and $b -gt ($g + 30) -and $b -gt 80) {
            if ($blueColors.ContainsKey($hex)) {
                $blueColors[$hex]++
            } else {
                $blueColors[$hex] = 1
            }
        }
        
        # Orange detection
        if ($r -gt ($g + 20) -and $r -gt ($b + 50) -and $g -gt 50 -and $r -gt 100) {
            if ($orangeColors.ContainsKey($hex)) {
                $orangeColors[$hex]++
            } else {
                $orangeColors[$hex] = 1
            }
        }
    }
}

$bestBlue = ($blueColors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Name
$bestOrange = ($orangeColors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Name

Write-Host "Blue: $bestBlue"
Write-Host "Orange: $bestOrange"
