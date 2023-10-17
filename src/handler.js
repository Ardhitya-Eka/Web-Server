/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const { nanoid } = require('nanoid');
const { notes } = require('./notes');

const addNotesHandler = (request, h) => {
  const { tittle, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    tittle, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccsess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccsess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil di tambahkan',
      data: {
        noteid: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan gagal di tambahkan',
  });
  response.code(500);
  return response;
};

const getAddNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteHandlerById = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'Success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'Fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteHandler = (request, h) => {
  const { id } = request.params;

  const { tittle, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== id) {
    notes[index] = {
      ...notes[index],
      tittle,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil di perbaharui !',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'gagal memperbaharui catatan, id tidak di temukan ',
  });
  response.code(404);
  return response;
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil di hapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Gagal menghapus catatan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNotesHandler,
  getAddNotesHandler,
  getNoteHandlerById,
  editNoteHandler,
  deleteNoteHandler,
};
