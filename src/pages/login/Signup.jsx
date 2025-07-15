import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "/config/constants";
import Input from "/components/Input";
import Statusbar from '/components/Statusbar';
import { fileToBase64 } from "/components/File";
import { getUserByAccount, createUser } from "/services/users";
import SignupMap from "./SignupMap";
import classes from "./Signup.module.scss";

export default function Signup() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        account: '',
        accountConfirm: undefined,  // undefined: 중복체크 미진행, false : 중복체크 통과못함, true : 중복체크 통과
        password: '',
        passwordConfirm: '',
        name: '',
        address: '',
        gender: '',
        profileImage: null
    });
    const { account, accountConfirm, password, passwordConfirm, name, address, gender, profileImage } = form;
    const validate = account && password && name && address && passwordConfirm;

    const navigate = useNavigate();

    const checkDuplicate = () => {
        getUserByAccount(account)
        .then(user => setForm(prev => ({ ...prev, accountConfirm: user?.id ? false : true })))
        .catch(() => setForm(prev => ({ ...prev, accountConfirm: false })))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!accountConfirm) {
            alert("아이디 중복 체크를 진행해주세요.");
            return;
        }
        if (!validate) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        createUser({ account, password, name, address, gender, profileImage: profileImage?.base64 || null })
        .then(() => {
            alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
            navigate(URL.LOGIN);
        }).catch(() => alert("회원가입에 실패했습니다."))
    };


    const handleFile = async e => {
        const { files } = e.target;
        const [file] = files;
        if (!file) return;  // 파일없음
        if (file?.size / 1024 > 500) {  // 500KB 초과
            alert("파일 사이즈는 500KB를 초과할 수 없습니다.");
            e.target.files = null;
            setForm(prev => ({ ...prev, profileImage: null }));
            return;
        }
        const base64 = await fileToBase64(file);
        setForm(prev => ({ ...prev, profileImage: { base64, name: file.name } }));
    };

    const onBack = e => {
        e.preventDefault();
        setForm(prev => ({ ...prev, address: "" }));
    }

    useEffect(() => setStep(form.address ? 1 : 0), [form.address]);

    return <>
        <div className={classes.container}>
            <form className={classes.form} style={{ left: `-${step * 100}%`}} onSubmit={handleSubmit} >
                <SignupMap onConfirm={address => setForm(prev => ({ ...prev, address }))} />
                <div className="d-flex flex-column align-items-stretch overflow-y-auto">
                    <Statusbar title="회원가입" onBack={onBack} />
                    <div className="d-flex flex-column flex-grow align-items-stretch gap-20 p-4" style={{ marginTop: 68 }}>
                        <div className="d-flex align-items-center">
                            <Input
                                id="register_id"
                                type="text"
                                name="account"
                                label="아이디"
                                required
                                value={form.account}
                                onChange={e => setForm(prev => ({ ...prev, account: e.target.value, accountConfirm: undefined }))}
                                errorMessage={accountConfirm == false ? '중복된 아이디가 있습니다.' : ''}
                            />
                            <div>
                                <input 
                                    type="button"
                                    value={accountConfirm ? '사용가능' : '중복확인'} 
                                    className={`btn border border-gray border-radius-20 ${accountConfirm == true ? classes.identified : ''}`} 
                                    disabled={!!accountConfirm} 
                                    onClick={checkDuplicate} 
                                />
                             </div>
                        </div>
                        
                        <Input
                            id="register_password"
                            type="password"
                            name="password"
                            label="비밀번호"
                            required
                            value={form.password}
                            onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                        />

                        <Input
                            label="비밀번호 확인"
                            placeholder="비밀번호를 다시 한번 입력하세요"
                            id="register_password_confirm"
                            type="password"
                            required
                            errorMessage={password && passwordConfirm && password != passwordConfirm ? '입력하신 비밀번호와 일치하지 않습니다' : ''}
                            value={form.passwordConfirm}
                            onChange={e => setForm(prev => ({ ...prev, passwordConfirm: e.target.value }))}
                        />
                        <Input 
                            id="register_name"
                            type="text"
                            name="name"
                            label="이름"
                            placeholder="이름을 입력하세요"
                            required
                            value={form.name}
                            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <hr />
                        <div className="d-flex flex-column align-items-stretch gap-8">
                            <small>성별</small>
                            <fieldset className="d-flex">
                                <input type="radio" id="male" value="남자" name="gender" onChange={() => setForm(prev => ({ ...prev, gender: '남자' }))} />
                                <label htmlFor="male" style={{ height: 60 }}>남자</label>
                                <input type="radio" id="female" value="여자" name="gender" onChange={() => setForm(prev => ({ ...prev, gender: '여자' }))} />
                                <label htmlFor="female" style={{ height: 60 }}>여자</label>
                            </fieldset>
                        </div>
                        <div className="d-flex flex-column align-items-stretch gap-8">
                            <small>프로필 사진</small>
                            <input id="profile_image" type="file" name="profileImage" accept="image/jpg, image/png, image/jpeg" onChange={handleFile} />
                            <label htmlFor="profile_image">
                                {!profileImage && <>
                                    <i className="fas fa-camera" />
                                    <p>이미지를 첨부하세요 (최대 500KB)</p>
                                </>}
                                {profileImage && <>
                                    <img src={profileImage.base64} width="40px" height="40px" className="border-radius-20" />
                                    <p>{profileImage.name}</p>
                                </>}
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary border-radius-0 mt-auto" disabled={!validate}>{validate ? '회원가입' : '필수 사항을 전부 입력하세요'}</button>
                </div>
            </form>
        </div>
    </>;
}
