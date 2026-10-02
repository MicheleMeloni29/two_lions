<?php
namespace Opencart\Admin\Controller\Extension\Twolions\Module;

class Twolions extends \Opencart\System\Engine\Controller {
    public function index(): void {
        $this->load->language('extension/twolions/module/twolions');
        $this->document->setTitle($this->language->get('heading_title'));

        $data['breadcrumbs'] = [];
        $data['breadcrumbs'][] = [
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'])
        ];
        $data['breadcrumbs'][] = [
            'text' => $this->language->get('heading_title'),
            'href' => $this->url->link('extension/twolions/module/twolions', 'user_token=' . $this->session->data['user_token'])
        ];

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/twolions/module/twolions', $data));
    }

    public function install(): void {
        $this->load->model('user/user_group');
        $this->model_user_user_group->addPermission($this->user->getGroupId(), 'access', 'extension/twolions/module/twolions');
        $this->model_user_user_group->addPermission($this->user->getGroupId(), 'modify', 'extension/twolions/module/twolions');
    }
}
