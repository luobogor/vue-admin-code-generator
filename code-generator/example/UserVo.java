@ApiModel(value = "会员")
public class UserVo{

  @ApiModelProperty(value = "ID")
  private Long id;

  @ApiModelProperty(value = "邮箱!ipt")
  private String email;

  @ApiModelProperty(value = "密码")
  private String pwd;

  @ApiModelProperty(value = "账号状态!ops")
  private Boolean enabled;
}
