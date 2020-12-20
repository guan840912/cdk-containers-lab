# my project
```bash
git clone https://github.com/guan840912/cdk-containers-lab.git
```

# setting aws credentials
```bash
aws configure
```

# install cdk dependency
```bash
cd cdk-containers-lab/
npx projen
```

# To list stack
```bash
cdk ls
```

# To deploy
```bash
cdk deploy 
containerslab: deploying...
containerslab: creating CloudFormation changeset...
[██████████████████████████████████████████████████████████] (6/6)

 ✅  containerslab

Outputs:
containerslab.labinstancePublicIp = x.x.x.x
containerslab.labinstanceinstanceId = i-01234567890qazwsx
```

# To destroy 
```bash
cdk destroy
```
# To debug 
```bash
sudo journalctl -u cloud-init
```

# Connect to ec2 
```bash
aws ssm start-session --target [instance-Id]
```

# Podman commnad example 
```bash
$ podman pull docker.io/nginx

$ podman run -d -p 80:80 docker.io/nginx

$ podman ps -a
```

## see more containes oss projects

[skopeo](https://github.com/containers/skopeo)

[buildah](https://github.com/containers/buildah)

[podman](https://github.com/containers/podman)