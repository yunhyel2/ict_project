import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "/components/Input";
import Statusbar from '/components/Statusbar';
import SignupMap from "./SignupMap";
import classes from "./Signup.module.scss";

async function getUserByUserId(userId) {
    const { data } = await axios.get(`/api/users/${userId}`);
    return data;
}
async function createUser(form) {
    const { data } = await axios.post(`/api/users`, form);
    return data;
}

export default function Signup() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        userId: '',
        userIdConfirm: undefined,  // undefined: 중복체크 미진행, false : 중복체크 통과못함, true : 중복체크 통과
        password: '',
        passwordConfirm: '',
        name: '',
        address: '',
        gender: ''
    });
    const { userId, userIdConfirm, password, passwordConfirm, name, address, gender } = form;
    const validate = userId && password && name && address && passwordConfirm;

    const navigate = useNavigate();

    const checkDuplicate = () => {
        getUserByUserId(userId)
        .then(user => setForm(prev => ({ ...prev, userIdConfirm: user?.id ? false : true })))
        .catch(() => setForm(prev => ({ ...prev, userIdConfirm: false })))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userIdConfirm) {
            alert("아이디 중복 체크를 진행해주세요.");
            return;
        }
        if (!validate) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        createUser({ userId, password, name, address, gender })
        .then(() => {
            alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
            navigate("/login");
        }).catch(() => alert("회원가입에 실패했습니다."))
    };

    const onBack = e => {
        e.preventDefault();
        setForm(prev => ({ ...prev, address: "" }))
    }

    useEffect(() => setStep(form.address ? 1 : 0), [form.address]);

    return <>
        <div className={classes.container}>
            <form className={classes.form} style={{ left: `-${step * 100}%`}} onSubmit={handleSubmit} >
                <SignupMap onConfirm={address => setForm(prev => ({ ...prev, address }))} />
                <div className="d-flex flex-column align-items-stretch">
                    <Statusbar title="회원가입" onBack={onBack} />
                    <div className="d-flex flex-column flex-grow align-items-stretch gap-20 p-4" style={{ marginTop: 68 }}>
                        <div className="d-flex align-items-center">
                            <Input
                                id="register_id"
                                type="text"
                                name="userId"
                                label="아이디"
                                required
                                value={form.userId}
                                onChange={e => setForm(prev => ({ ...prev, userId: e.target.value, userIdConfirm: undefined }))}
                                errorMessage={userIdConfirm == false ? '중복된 아이디가 있습니다.' : ''}
                            />
                            <div>
                                <input 
                                    type="button"
                                    value={userIdConfirm ? '사용가능' : '중복확인'} 
                                    className={`btn border border-gray border-radius-20 ${userIdConfirm == true ? classes.identified : ''}`} 
                                    disabled={!!userIdConfirm} 
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
                    </div>
                    <button type="submit" className="btn btn-primary border-radius-0 mt-auto" disabled={!validate}>{validate ? '회원가입' : '폼을 전부 입력하세요'}</button>
                </div>
            </form>
        </div>
    </>;
}
