import Search from '/components/Search';
import styles from './Gathering.module.css';
export default function Gathering(){


        



    return<>
        <div className={styles.container}>
            <div className={styles.hash_tag}>
                <div className={styles.hash_item}>#알바</div>
                <div className={styles.hash_item}>#소모임</div>
                <div className={styles.hash_item}>#친구구해요</div>
                <div className={styles.hash_item}>#운동</div>
                <div className={styles.hash_item}>#취미</div>
                <div className={styles.hash_item}>#스터디</div>
                <div className={styles.hash_item}>#급만남</div>
            </div>

            <div className={styles.middle}>
                <div className={styles.search}><Search/></div>
                <div className={styles.gather} >모집하기</div>
            </div>
            <div className={styles.card_list}>
                <div className={styles.card_item}>
                    <div className={styles.title}>강아지 산책모임</div>
                    <div className={styles.when}>
                        사당동 6월 30일 월요일 <br/>오후 5시</div>
                    <div className={styles.party}>
                        <div className={styles.hha}>
                            <div className={styles.likes}><i className="fa-solid fa-heart"></i></div>
                            <div className={styles.reply}><i className="fa-solid fa-quote-left"></i></div>
                        </div>
                        <div className={styles.number}><i className="fa-solid fa-user"></i> 3 / 4</div>
                    </div>
                </div>
                <div className={styles.card_item}>
                
                </div>
                <div className={styles.card_item}>
                
                </div>
                <div className={styles.card_item}>
                
                </div>
                <div className={styles.card_item}>
                
                </div>
                <div className={styles.card_item}>
                
                </div>
            </div>
            <div className={styles.paging}> 1 2 3 4</div>
        </div>

    </>

}