#!/bin/bash

set -x

function process {
    pdf=$1
    file=$(basename $pdf .pdf)

    #out=../thumbs/$file.x200.jpg
    #[ -f $out ] || convert -thumbnail x200 -background white $pdf[0] $out

    out=../thumbs/$file.x200.jpg
    convert -thumbnail x200 -background white -flatten layers $pdf[0] $out
}

cd ../posters
for path in $(find . -name "*.pdf"); do
    process $path
done

#process 1860.pdf
