<?php

namespace App\Repository;

use App\Entity\Salon;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Salon|null find($id, $lockMode = null, $lockVersion = null)
 * @method Salon|null findOneBy(array $criteria, array $orderBy = null)
 * @method Salon[]    findAll()
 * @method Salon[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SalonRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Salon::class);
    }

    // /**
    //  * @return Salon[] Returns an array of Salon objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Salon
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
