import React, { useReducer } from 'react';
import styles from './ProfileBox.module.css';

const ProfileBox = ({userInfo}) => {

    return (
        <div className={styles.box}>
            <table>
            <tbody>
                <tr className={styles.tr}>
                    <td className="py-2">
                        Username:
                    </td>
                    <td className="py-2">
                        {userInfo.username}
                    </td>
                </tr>
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
                        Name:
                    </td>
                    <td className="py-2">
                        {userInfo.name}
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}

export default ProfileBox;