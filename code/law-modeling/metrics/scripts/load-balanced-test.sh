rm ../outputs/loadbalanced.csv
rm -r ../outputs/loadbalanced
/Applications/apache-jmeter-5.5/bin/jmeter -n -t ../LoadBalancedTest.jmx -l ../outputs/loadbalanced.csv -e -o ../outputs/loadbalanced
