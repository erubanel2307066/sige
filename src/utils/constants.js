export const GROUPS_DB = {
    '1D': { id: '1D', name: '1° D', fullName: '1° D - Computación', count: 30 },
    '2D': { id: '2D', name: '2° D', fullName: '2° D - Computación', count: 31 },
    '3D': { id: '3D', name: '3° D', fullName: '3° D - Computación', count: 28 },
};

export const SCHEDULE = {
    1: [ // Lunes
        { groupId: '1D', time: '11:10 - 12:50' },
        { groupId: '2D', time: '12:50 - 13:40' }
    ],
    2: [ // Martes (Día de prueba principal)
        { groupId: '3D', time: '9:30 - 10:20' },
        { groupId: '1D', time: '10:20 - 11:10' },
        { groupId: '2D', time: '11:10 - 12:00' }
    ],
    3: [ // Miércoles
        { groupId: '3D', time: '11:10 - 12:00' },
        { groupId: '1D', time: '12:00 - 12:50' }
    ],
    4: [ // Jueves
        { groupId: '2D', time: '12:00 - 12:50' },
        { groupId: '3D', time: '12:50 - 13:40' }
    ],
    5: [ // Viernes
        { groupId: '1D', time: '08:00 - 09:40' }
    ],
};

export const STUDENTS_1D = [
    { id: 's01', listNum: '01', name: 'ABARCA CRUZ JUAN CARLOS' },
    { id: 's02', listNum: '02', name: 'AVILA MENDOZA ODARI GUADALUPE' },
    { id: 's03', listNum: '03', name: 'BARRERA ZEFERINO ALEXIS' },
    { id: 's04', listNum: '04', name: 'CARRANZA PADUA HECTOR IVAN' },
    { id: 's05', listNum: '05', name: 'CATARINO JUÁREZ JEIMMY GUADALUPE' },
    { id: 's06', listNum: '06', name: 'CARMONA MAGADAN ISMAEL FELIPE' },
    { id: 's07', listNum: '07', name: 'DAMIÁN GASPAR DILAN GAEL' },
    { id: 's08', listNum: '08', name: 'FRANCO MAYA BERENICE' },
    { id: 's09', listNum: '09', name: 'GALLARDO IGNACIO GUADALUPE' },
    { id: 's10', listNum: '10', name: 'GALVEZ GARCIA AYLIN' },
    { id: 's11', listNum: '11', name: 'GARCIA ANDRACA WENDY QUETZALLY' },
    { id: 's12', listNum: '12', name: 'GARCIA MUÑOZ MATEO ALEXANDER' },
    { id: 's13', listNum: '13', name: 'GARCIA SALADO ELID AARON' },
    { id: 's14', listNum: '14', name: 'GONZÁLEZ MORALES AMÉRICA GUADALUPE' },
    { id: 's15', listNum: '15', name: 'GUZMAN DIAZ QUETZALLY' },
];

export const BEHAVIOR_TAGS = [
    { id: 'play', icon: '🎮', label: 'Jugó', impact: -0.5 },
    { id: 'talk', icon: '🗣️', label: 'Platicó', impact: -0.2 },
    { id: 'out', icon: '🏃', label: 'Salió', impact: -0.3 },
    { id: 'lazy', icon: '❌', label: 'No trabajó', impact: -1.0 },
    { id: 'star', icon: '⭐', label: 'Destacado', impact: 0.5 },
];
