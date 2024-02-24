scp -i <key-path> ./sql/init.sql ec2-user@<bastion-ip>:/tmp/init.sql
# You should be prompted for passwords. The password for the default user `db_user` is stored in secrets
#   manager. The password for the user `app_user` is `app_password` and used within the init.sql script.
ssh -i <key-path> ec2-user@<bastion-ip> psql -U db_user -h <postgres-host> -p 5432 -f /tmp/init.sql -d postgres