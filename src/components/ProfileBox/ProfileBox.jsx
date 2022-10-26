import React, { useReducer } from 'react';
import styles from './ProfileBox.module.css';

const ProfileBox = ({userInfo}) => {

    console.log(userInfo);
    return (
        <div className={styles.box}>
            <table>
            <tbody>
                <tr className={styles.tr}>
                    <td className="py-2">
                        My Email:
                    </td>
                    <td className="py-2">
                        {userInfo.email}
                    </td>
                </tr>
                <tr className={styles.tr}>
                    <td className="py-2">
                        The Number of Reviews:
                    </td>
                    <td className="py-2">

                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}

export default ProfileBox;