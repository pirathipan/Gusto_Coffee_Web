<?php

namespace App\Controller;

use App\Entity\Salon;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;


class SalonController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $salon = $request->attributes->get('data');

        if(!($salon instanceof Salon)) {
            throw new \RuntimeException('Salon attendu');
        }
        $salon->setFile($request->files->get('file'));
        $salon->setUpdatedAt(new \DateTime());
        return $salon;



    }
}
