variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  type        = string
}

variable "security_group_ids" {
  description = "List of security group IDs"
  type        = list(string)
}

resource "aws_instance" "app_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  
  vpc_security_group_ids = var.security_group_ids
  
  tags = {
    Name = "UserManagementApp"
  }

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y nodejs npm
              EOF
} 