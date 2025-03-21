import { Col, Row, Input, Button, Form } from 'antd';
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export default function TaskInput() {
  const [descriptionTask, setDescriptionTask] = useState('');

  const createTask = async () => {
    if (!descriptionTask) {
      Swal.fire(
        'Error',
        'No se puede crear la tarea. Ya que algún campo está vacío',
        'error'
      );
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const saveTask = getFirestore();
      try {
        await addDoc(collection(saveTask, 'tasks'), {
          datetime: new Date().toISOString(),
          description: descriptionTask,
          email: user.email,
        });

        Swal.fire('Tarea Creada', '', 'success');

        setDescriptionTask('');
      } catch (error) {
        Swal.fire('Error', 'Error creando la tarea', 'error');
      }
    } else {
      Swal.fire('Error', 'No hay un usuario logueado', 'error');
    }
  };

  return (
    <Row justify='center' align='middle'>
      <Col>
        <Form
          name='tasks'
          layout='inline'
          style={{
            minWidth: 385,
            padding: '20px 20px',
            border: '1px solid #e6e6e6',
            borderRadius: 10,
            backgroundColor: 'white',
          }}
        >
          <Form.Item>
            <Input
              value={descriptionTask}
              onChange={(e) => setDescriptionTask(e.target.value)}
              placeholder='Escribe una nueva tarea'
              autoSize
              maxLength={100}
              style={{ resize: 'none', padding: 5, width: 250 }}
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={createTask}
              type='primary'
              htmlType='submit'
              style={{
                marginLeft: '20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
              }}
            >
              +
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
