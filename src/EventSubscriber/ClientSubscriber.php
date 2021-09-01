<?php


namespace App\EventSubscriber;
use App\Entity\Client;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Mime\Email;


class ClientSubscriber implements \Doctrine\Common\EventSubscriber
{

    /**
     * @var UserPasswordHasherInterface
     */
    private UserPasswordHasherInterface $passwordHasher;
    private MailerInterface $mailer;

    public function __construct(UserPasswordHasherInterface $passwordHasher, MailerInterface $mailer)
    {
        $this->passwordHasher = $passwordHasher;
        $this->mailer = $mailer;
    }


    /**
     * @inheritDoc
     */
    public function getSubscribedEvents(): array
    {
        // TODO: Implement getSubscribedEvents() method.
        return [
            Events::prePersist,
            Events::postPersist
        ];
    }

    /**
     * @Param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $this->encodePassword($args);
    }

    /**
     * @Param LifecycleEventArgs $args
     */
    public function postPersist(LifecycleEventArgs $args)
    {
        $this->sendNotifyMail($args);
    }

    public function encodePassword(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if(!$entity instanceof Client)
        {
            return ;
        }

        $entity->setPassword($this->passwordHasher->hashPassword($entity, $entity->getPassword()));

    }

    public function sendNotifyMail(LifecycleEventArgs $args)
    {

        $entity = $args->getObject();

        if(!$entity instanceof Client)
        {
            return ;
        }

        $email = (new Email())
            ->from('npmcw25@gmail.com')
            ->to($entity->getEmail())
            ->subject("Création de compte")
            ->html("<p>Votre compte a bien été crée </p>")
        ;
        $this->mailer->send($email);
    }


}
