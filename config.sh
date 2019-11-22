# teu-bucket-no-s3
sam package --s3-bucket=teu-bucket-no-s3 --template-file=./template.yml --output-template-file=./template-export.yml --region=us-east-1
aws cloudformation deploy --template-file ./template-export.yml --stack-name dev-academy-sales --region us-east-1 --capabilities CAPABILITY_IAM
