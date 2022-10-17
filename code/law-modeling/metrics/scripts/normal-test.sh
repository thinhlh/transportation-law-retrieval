rm ../outputs/normal.csv
rm -r ../outputs/normal

/Applications/apache-jmeter-5.5/bin/jmeter -n -t ../NormalTest.jmx -l ../outputs/normal.csv -e -o ../outputs/normal
