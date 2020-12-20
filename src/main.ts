import * as cdk from 'aws-cdk-lib';

export class ec2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const vpc = cdk.aws_ec2.Vpc.fromLookup(this, 'defaultvpc', {
      isDefault: true,
    });
    const userData = cdk.aws_ec2.UserData.forLinux();
    userData.addCommands(`
    set -xe
    yum update -y
    sleep 15
    curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/CentOS_7/devel:kubic:libcontainers:stable.repo
    sleep 5
    yum repolist
    yum -y install yum-plugin-copr
    yum -y copr enable lsm5/container-selinux
    yum -y install podman
    yum -y install buildah
    sed -i 's/^mountopt/#mountopt/g' /etc/containers/storage.conf
    `);
    const labinstance = new cdk.aws_ec2.Instance(this, 'containerInstance', {
      vpc,
      instanceType: new cdk.aws_ec2.InstanceType('t3.large'),
      machineImage: cdk.aws_ec2.MachineImage.latestAmazonLinux({ generation: cdk.aws_ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
      blockDevices: [{
        deviceName: '/dev/xvda',
        volume: cdk.aws_ec2.BlockDeviceVolume.ebs(60),
      }],
      userData,
      //keyName: 'eksworker',
    });
    labinstance.role.addManagedPolicy(
      cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
    );
    labinstance.connections.allowFromAnyIpv4(cdk.aws_ec2.Port.tcp(22));
    labinstance.connections.allowFromAnyIpv4(cdk.aws_ec2.Port.tcp(80));

    new cdk.CfnOutput(this, 'labinstancePublicIp', {
      value: labinstance.instancePublicIp,
    });
    new cdk.CfnOutput(this, 'labinstanceinstanceId', {
      value: labinstance.instanceId,
    });
  }
}

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

new ec2Stack(app, 'containerslab', { env: devEnv });

app.synth();