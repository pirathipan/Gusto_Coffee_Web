<?php

namespace App\EventSubscriber;
use App\Entity\Client;
use App\Entity\Reservation;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ReservationSubscriber implements \Doctrine\Common\EventSubscriber
{
    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * @inheritDoc
     */
    public function getSubscribedEvents(): array
    {
        return [
          Events::postPersist
        ];
    }

    /**
     * @Param LifecycleEventArgs $args
     */
    public function postPersist(LifecycleEventArgs $args)
    {
        $this->notifyMail($args);
    }

    public function notifyMail(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof Reservation)
        {
            return ;
        }
        $email = (new Email())
            ->from('npmcw25@gmail.com')
            ->to($entity->getClient()->getEmail())
            ->subject("Réservation")
            ->html("<p>Votre réservation a été bien prise en compte. Nous vous remercions pour votre visite à bientôt.</p>")
        ;
        $this->mailer->send($email);
    }
}
