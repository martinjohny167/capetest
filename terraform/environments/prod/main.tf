module "security" {
  source = "../../modules/security"
}

module "s3" {
  source = "../../modules/s3"
  
  bucket_name = "user-management-assets-prod"
}

module "rds" {
  source = "../../modules/rds"
  
  db_name     = "usermanagement"
  db_username = "admin"
  db_password = var.db_password  # This should be provided via a tfvars file
}

module "ec2" {
  source = "../../modules/ec2"
  
  instance_type      = "t2.small"  # Adjust based on your needs
  ami_id            = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 AMI ID (update as needed)
  security_group_ids = [module.security.app_security_group_id]
}

# Output values for reference
output "ec2_instance_ip" {
  value = module.ec2.instance_public_ip
}

output "rds_endpoint" {
  value = module.rds.endpoint
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
} 