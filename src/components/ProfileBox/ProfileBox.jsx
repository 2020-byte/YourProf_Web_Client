import React, { useReducer } from 'react';
import styles from './ProfileBox.module.css';

const ProfileBox = ({user}) => {

    return (
        <div className={styles.box}>
            <table>
            <tbody>
                <tr className={styles.tr}>
                    <td className="py-2">
                        My Email:
                    </td>
                    <td className="py-2">
                        {user.email}
                    </td>
                </tr>
                <tr className={styles.tr}>
                    <td className="py-2">
                        The Number of Reviews:
                    </td>
                    <td className="py-2">
                        {user.reviews.length}
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}

export default ProfileBox;