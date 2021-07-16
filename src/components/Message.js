import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return (
        <div>
            {photoURL ? (
                <img
                    src={photoURL}
                    alt="Avatar"
                    className="rounded-full mr-4"
                    width={45}
                    height={45}
                />
            ) : null}

            <div>
                    {displayName ? (
                        <p className="mr-2 text-primary-500">{displayName}</p>
                    ) : null}
                    {createdAt?.seconds ? (
                        <span className="text-gray-500 text-xs">
                            {formatRelative(new Date(createdAt.seconds * 1000), new Date()
                            )}
                        </span>
                    ) : null}
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Message;