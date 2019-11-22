# dev-academy-checkout-caio
sam package --s3-bucket=dev-academy-checkout-caio --template-file=./template.yml --output-template-file=./template-export.yml --region=us-east-1
aws cloudformation deploy --template-file ./template-export.yml --stack-name dev-academy-sales --region us-east-1 --capabilities CAPABILITY_IAM
