import React, { useState } from 'react';

import { Summary } from '../summary/summary.component';
import { Details } from '../details/details.component';

export const ModuleContent = () => {
    const [module, setModule] = useState();

    const handleModuleClick = (module) => {
        setModule(module);
    }

    return (
        <div>
            {module ?
                (<Details handler={handleModuleClick}></Details>) :
                (<Summary handler={handleModuleClick}></Summary>)
            }
        </div>
    )
}