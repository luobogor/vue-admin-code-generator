/* eslint-disable no-undef */
import mUtils from '../mUtils';

describe('mUtils', () => {
  it('exec one Var', () => {
    const startTagReg = '@ApiModelProperty\\(value\\s*=\\s*"';
    const endTagReg = '"\\)';

    const text1 = '@ApiModelProperty(value = "国家名称")';
    const res1 = mUtils.execVars(startTagReg, endTagReg, text1);
    expect(res1).toEqual(['国家名称']);

    const text2 = '@ApiModelProperty(value="国家名称")';
    const res2 = mUtils.execVars(startTagReg, endTagReg, text2);
    expect(res2).toEqual(['国家名称']);

    const text3 = '@ApiModelProperty(value=    "国家名称")';
    const res3 = mUtils.execVars(startTagReg, endTagReg, text3);
    expect(res3).toEqual(['国家名称']);
  });

  it('exec one Var other tag', () => {
    const startTagReg = 'private\\s+';
    const endTagReg = ';';

    const text1 = 'private Long id;';
    const res1 = mUtils.execVars(startTagReg, endTagReg, text1);
    expect(res1).toEqual(['Long id']);

    const text2 = 'private List<ElementCategory> childs;';
    const res2 = mUtils.execVars(startTagReg, endTagReg, text2);
    expect(res2).toEqual(['List<ElementCategory> childs']);
  });

  it('exec one more Var', () => {
    const startTagReg = '@ApiModelProperty\\(value\\s*=\\s*"';
    const endTagReg = '"\\)';

    const text = '@ApiModelProperty(value = "国家名称")\n\t@ApiModelProperty(value = "国家编码")';
    const res = mUtils.execVars(startTagReg, endTagReg, text);
    expect(res).toEqual(['国家名称', '国家编码']);
  });
});
